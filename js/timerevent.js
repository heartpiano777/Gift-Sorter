export const timer_event = () => {
    time -= 1;
    TimeText.textContent = time;
     if (time == 0) {
        clearInterval(timer);
        end();
    }
}