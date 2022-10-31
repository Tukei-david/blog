<script>

import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default {
    props: {
        date: {
            required: true
        }
    },

    setup(props, context) {

        let date = ref(props.date)

        // Watch the props value so that we can reset the date value
        watch(() => props.date, (value) => {
            date.value = value
        })

        // every minute create an instance of day.js
        setInterval(() => {
            date.value = dayjs(date.value)
        }, 60000)

        return () => context.slots.default({
            fromNow: date.value.fromNow()
        })
    },
}
</script>