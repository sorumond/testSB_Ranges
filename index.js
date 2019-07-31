class Ranges {
    constructor() {
        this.rangesList = [];
    }

    add(addingRange) {
        let changed = false;
        this.rangesList.forEach(range => {
            const isAddingInRange =
                (addingRange[0] >= range[0] - 1 &&
                    addingRange[0] <=
                    range[1] +
                    1) /* If first number of adding range in range of existing ranges */ ||
                (addingRange[1] >= range[0] - 1 &&
                    addingRange[1] <=
                    range[1] +
                    1) /*If second number od adding range in range of existing ranges */ ||
                (addingRange[0] <= range[0] &&
                    addingRange[1] >=
                    range[1]); /* If existing range in range of adding range */

            if (isAddingInRange) {
                changed = true;
                if (range[0] >= addingRange[0]) {
                    range[0] = addingRange[0];
                }
                if (range[1] <= addingRange[1]) {
                    range[1] = addingRange[1];
                }
            }
        });
        if (!changed) {
            this.rangesList.push(addingRange);
        }

        if (changed) {
            for (let i = 0; i < this.rangesList.length; i++) {
                for (let k = 0; k < this.rangesList.length; k++) {
                    if (i === k) {
                        continue;
                    }

                    let firstCompare = this.rangesList[i];
                    let secondCompare = this.rangesList[k];

                    let isSameRanges =
                        firstCompare[0] === secondCompare[0] &&
                        firstCompare[1] === secondCompare[1];
                    const isRangeInRange =
                        (secondCompare[0] >= firstCompare[0] - 1 &&
                            secondCompare[0] <= firstCompare[1] + 1) ||
                        (secondCompare[1] >= firstCompare[0] - 1 &&
                            secondCompare[1] <= firstCompare[1] + 1) ||
                        (secondCompare[0] <= firstCompare[0] &&
                            secondCompare[1] >= firstCompare[1]);
                    if (isSameRanges) {
                        this.rangesList.slice(k, 1);
                        k--;
                    }
                    if (isRangeInRange) {
                        if (secondCompare[0] < firstCompare[0]) {
                            firstCompare[0] = secondCompare[0];
                        }
                        if (secondCompare[1] > firstCompare[1]) {
                            firstCompare[1] = secondCompare[1];
                        }
                        this.rangesList.splice(k, 1);
                        k--;
                    }
                }
            }
        }
    }

    remove(removingRange) {
        for (let i = 0; i < this.rangesList.length; i++) {
            let range = this.rangesList[i];
            let isRemovingFromStart =
                range[0] >= removingRange[0] &&
                range[0] <= removingRange[1] &&
                range[1] > removingRange[1];
            let isRemovingFromEnd =
                range[0] < removingRange[0] &&
                range[1] > removingRange[0] &&
                range[1] <= removingRange[1];
            let isDeleteRange =
                range[0] >= removingRange[0] && range[1] <= removingRange[1];
            let isSplitRange =
                range[0] < removingRange[0] && range[1] > removingRange[1];

            if (isRemovingFromStart) {
                this.rangesList[i][0] = removingRange[1] + 1;
            } else if (isRemovingFromEnd) {
                this.rangesList[i][1] = removingRange[0] - 1;
            } else if (isDeleteRange) {
                this.rangesList.splice(i, 1);
                i--;
            } else if (isSplitRange) {
                this.rangesList.splice(
                    i,
                    1,
                    [this.rangesList[i][0], removingRange[0] - 1],
                    [removingRange[1] + 1, this.rangesList[i][1]]
                );
                i--;
            }
        }
    }

    print() {
        console.log(this.rangesList);
    }
}

const r = new Ranges();

r.add([1, 4]);
r.print();

// Should display: [1, 4]

r.add([10, 20]);
r.print();

// Should display: [1, 4] [10, 20]

r.add([10, 10]);
r.print();

// Should display: [1, 4] [10, 20]

r.add([21, 21]);
r.print();

// Should display: [1, 4] [10, 21]

r.add([2, 4]);
r.print();

// Should display: [1, 4] [10, 21]

r.add([3, 8]);
r.print();

// Should display: [1, 8] [10, 21]

r.remove([10, 10]);
r.print();

// Should display: [1, 8] [11, 21]

r.remove([10, 11]);
r.print();

// Should display: [1, 8] [12, 21]

r.remove([15, 17]);
r.print();

// Should display: [1, 8] [12, 14] [18, 21]
r.remove([3, 19]);
r.print();
// Should display: [1, 2] [20, 21]

