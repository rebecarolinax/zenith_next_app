import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const SelectBlue = ({ children, className,  }) => {
    return (
        <Select>
            <SelectTrigger className={`w-[30%] border border-blue-700 rounded-[8px] ${className}`}>
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="develop">Developer</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
