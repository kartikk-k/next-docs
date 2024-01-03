import React from "react";


const Separator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
    (props, ref) => (
        <div
            ref={ref}
            className='w-[1px] shrink-0 h-5 bg-gray-300'
            {...props}
        />
    )
)
Separator.displayName = 'Separator'


export default Separator;