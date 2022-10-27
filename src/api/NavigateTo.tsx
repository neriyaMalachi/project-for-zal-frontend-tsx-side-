import history from "../../../frontend-tsx-side/src/history";

export function NavigateTo(location){
    history.replace(location)
    history.go(0)
   }