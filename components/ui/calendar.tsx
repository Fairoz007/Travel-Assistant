'use client'

import * as React from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-gradient-to-br from-white via-[#fefefe] to-[#f8fafc] p-6 rounded-2xl shadow-[0_8px_32px_rgba(45,106,79,0.12),0_2px_8px_rgba(0,0,0,0.08)] border border-[#e8f5f0]/50 backdrop-blur-sm [--cell-size:theme(spacing.12)]',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-full max-w-sm mx-auto daypicker', defaultClassNames.root),
        months: cn(
          'flex flex-col relative transition-all duration-300 ease-in-out',
          defaultClassNames.months,
        ),
        month: cn('flex flex-col w-full gap-5', defaultClassNames.month),
        nav: cn(
          'flex items-center justify-between w-full px-4 py-4 bg-gradient-to-r from-[#f0f9f6] to-[#e8f5f0] rounded-xl mx-2 mb-4 border border-[#d4eddf]/30',
          defaultClassNames.nav,
        ),
        nav_button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-9 w-9 p-0 hover:bg-gradient-to-br hover:from-[#52B788] hover:to-[#40916C] hover:text-white hover:shadow-lg transition-all duration-300 rounded-xl text-[#2D6A4F] shadow-sm border border-[#c7e9c0]/50 nav_button',
          defaultClassNames.nav_button_previous,
        ),
        nav_button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-9 w-9 p-0 hover:bg-gradient-to-br hover:from-[#52B788] hover:to-[#40916C] hover:text-white hover:shadow-lg transition-all duration-300 rounded-xl text-[#2D6A4F] shadow-sm border border-[#c7e9c0]/50 nav_button',
          defaultClassNames.nav_button_next,
        ),
        caption_label: cn(
          'flex items-center justify-center py-3 text-xl font-black bg-gradient-to-r from-[#2D6A4F] to-[#40916C] bg-clip-text text-transparent tracking-tight',
          defaultClassNames.caption_label,
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-8 gap-1.5',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute bg-popover inset-0 opacity-0',
          defaultClassNames.dropdown,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex w-full', defaultClassNames.weekdays),
        head_cell: cn(
          'text-[#2D6A4F] font-black text-sm flex-1 text-center py-4 select-none uppercase tracking-widest bg-gradient-to-b from-[#f0f9f6] to-[#e8f5f0] rounded-lg mx-1 border border-[#d4eddf]/40',
          defaultClassNames.head_cell,
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-10',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-xs select-none text-[#6b7280]',
          defaultClassNames.week_number,
        ),
        day: cn(
          'relative w-full h-full p-0 text-center group/day aspect-square select-none',
          defaultClassNames.day,
        ),
        range_start: cn(
          'rounded-l-2xl bg-gradient-to-r from-[#52B788] to-[#74C69D] shadow-lg',
          defaultClassNames.range_start,
        ),
        range_middle: cn('bg-gradient-to-r from-[#74C69D] to-[#95D5B2] shadow-md', defaultClassNames.range_middle),
        range_end: cn('rounded-r-2xl bg-gradient-to-r from-[#74C69D] to-[#52B788] shadow-lg', defaultClassNames.range_end),
        day_selected: cn(
          'bg-gradient-to-br from-[#95D5B2] to-[#74C69D] text-[#2D6A4F] rounded-2xl font-black ring-2 ring-[#52B788]/50 shadow-lg border-2 border-[#52B788]/20',
          defaultClassNames.day_selected,
        ),
        day_today: cn(
          'bg-gradient-to-br from-[#95D5B2] to-[#74C69D] text-[#2D6A4F] rounded-2xl font-black ring-2 ring-[#52B788]/50 shadow-lg border-2 border-[#52B788]/20',
          defaultClassNames.day_today,
        ),
        outside: cn(
          'text-[#d1d5db] aria-selected:text-[#d1d5db]',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-[#d1d5db] opacity-50',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-4 text-[#2D6A4F]', className)} {...props} />
            )
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4 text-[#2D6A4F]', className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-12 items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      footer={
        <div className="flex items-center justify-between px-4 py-4 bg-gradient-to-r from-[#f8fafc] to-[#f0f9f6] rounded-xl mx-2 mt-4 border border-[#e8f5f0]/60">
          <Button
            variant="ghost"
            size="sm"
            className="bg-gradient-to-r from-[#52B788] to-[#40916C] text-white hover:from-[#40916C] hover:to-[#2D6A4F] font-bold text-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20"
            onClick={() => {
              const today = new Date()
              props.onSelect?.(today)
            }}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#374151] font-semibold text-sm px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#e5e7eb]"
            onClick={() => props.onSelect?.(undefined)}
          >
            Clear
          </Button>
        </div>
      }
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'flex aspect-square size-auto w-full min-w-12 flex-col gap-1 leading-none font-bold text-base transition-all duration-300 rounded-2xl hover:bg-gradient-to-br hover:from-[#F1FFF8] hover:to-[#e8f5f0] hover:shadow-lg hover:scale-105 hover:border-2 hover:border-[#52B788]/30 data-[selected-single=true]:bg-gradient-to-br data-[selected-single=true]:from-[#52B788] data-[selected-single=true]:to-[#40916C] data-[selected-single=true]:text-white data-[selected-single=true]:shadow-xl data-[selected-single=true]:font-black data-[selected-single=true]:scale-105 data-[selected-single=true]:border-2 data-[selected-single=true]:border-white/20 data-[range-middle=true]:bg-gradient-to-r data-[range-middle=true]:from-[#74C69D] data-[range-middle=true]:to-[#95D5B2] data-[range-middle=true]:text-white data-[range-start=true]:bg-gradient-to-r data-[range-start=true]:from-[#52B788] data-[range-start=true]:to-[#74C69D] data-[range-start=true]:text-white data-[range-end=true]:bg-gradient-to-r data-[range-end=true]:from-[#74C69D] data-[range-end=true]:to-[#52B788] data-[range-end=true]:text-white group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-[#52B788] group-data-[focused=true]/day:ring-offset-2 data-[range-end=true]:rounded-2xl data-[range-end=true]:rounded-r-2xl data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-2xl data-[range-start=true]:rounded-l-2xl [&>span]:text-xs [&>span]:opacity-70 day',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
