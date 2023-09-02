class Queue {
    startInex = 0;
    endIndex = 0;

    elements = new Map();


    enqueue() {
        this.elements.set(this.endIndex, value)
        this.endIndex++
    }

    dequeue() {
        if (this.startInex >= this.endIndex) return;

        const  item = this.elements.get(this.startInex);

        this.elements.delete(this.startInex);

        this.startInex++
        return item

        
    }
}