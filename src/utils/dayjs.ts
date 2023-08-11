import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'


dayjs.extend(utc)
dayjs.extend(timezone)

type TDateFormatterParams = {
    dateTime: string
    format: string
    time?: 'start' | 'end'
}

export const dateFormatter = ({
    dateTime,
    format,
    time,
}: TDateFormatterParams) => {
    const tz = 'Asia/Bangkok'
    const date = dayjs(dateTime).tz(tz)

    switch (time) {
        case 'start': {
            return date.startOf('day').format(format)
        }
        case 'end': {
            return date.endOf('day').format(format)
        }
        default: {
            return date.format(format)
        }
    }
}