export default class EventSignal<T> {
    private listeners: Set<(event: T) => void> = new Set();

    public subscribe(callback: (event: T) => void) {
        this.listeners.add(callback);
    }

    public unsubscribe(callback: (event: T) => void) {
        this.listeners.delete(callback);
    }

    public triggerEvent(data: T) {
        for (const listener of this.listeners) {
            listener(data);
        }
    }
}
