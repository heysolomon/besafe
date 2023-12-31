"use client"

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link } from 'lucide-react'
import { FieldError } from 'react-hook-form'
import Spinner from './spinner'

type TProps = {
    id: string;
    field: object;
    loading: boolean;
    error: FieldError | undefined;
}

const CheckerInput = ({ field, error, id, loading }: TProps) => {
    return (
        <div className={`flex items-center justify-between md:w-[50%] mx-auto rounded-[48px] border-[4px] border-[#353C4A] shadow-input bg-[#181E29] text-lite pl-5 pr-1 py-1 mt-5 focus-within:border-brand-blue/60 ${error && " border-red-400 focus-within:border-red-400"}`}>
            <Link />
            <Input type="text" className='bg-transparent border-none md:text-md' placeholder='Enter the link here' id={id} {...field} />
            <Button className='py-3 px-5'>
                {loading ? <Spinner className='w-5 h-5' /> : "Check"}
            </Button>
        </div>
    )
}

export default CheckerInput
