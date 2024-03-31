import { format, addDays, isWithinInterval } from "date-fns";

function sortingToday(todos){
    const today = format(new Date(), 'MM/dd/yyyy');
    todos.forEach(todo => {
        if (todo.dueDate == today){
            console.log("today's todo:");
            console.log(todo);

        }
    });

}

function sortingNext7Days(todos){
    const today = format(new Date(), 'MM/dd/yyyy');
    const next7day = format(addDays(today, 7), 'MM/dd/yyyy');
    todos.forEach(todo => {
        if (isWithinInterval(todo.dueDate, {start: today, end: next7day})){
            console.log("next 7 day's todo:");
            console.log(todo);
        }
    });
}

export {sortingNext7Days, sortingToday};