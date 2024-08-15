// backend/models/Learner.js
class Learner {
    constructor(learnerId, learnerName, interestArea) {
        this.learnerId = learnerId;
        this.learnerName = learnerName;
        this.interestArea = interestArea;
    }
}

module.exports = Learner;