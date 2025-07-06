import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../icons';

interface SortDropdownProps {
    sortOption: string;
    setSortOption: (option: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, setSortOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options = [
        { value: 'date-desc', label: 'Newest → Oldest' },
        { value: 'date-asc', label: 'Oldest → Newest' },
        { value: 'title-asc', label: 'Alphabetical (A-Z)' },
        { value: 'title-desc', label: 'Alphabetical (Z-A)' },
    ];

    const handleOptionClick = (value: string) => {
        setSortOption(value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const currentLabel = options.find(option => option.value === sortOption)?.label || 'Sort';

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 text-sm bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
            >
                Sort: {currentLabel}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortOption === option.value ? 'bg-gray-50 font-medium' : ''}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
