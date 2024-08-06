export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    distanceTo(vector: Vector2): number {
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;

        return Math.sqrt(dx ** 2 + dy ** 2);
    }
}