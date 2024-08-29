export default abstract class Scheduler {
    static runTaskLater(task: () => void, delay: number): number;
    static cancelTask(task: number): void;
}
