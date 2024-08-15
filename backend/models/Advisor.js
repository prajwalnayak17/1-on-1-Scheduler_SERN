// backend/models/Advisor.js
class Advisor {
    constructor(advisorId, advisorName, expertise, availableSlots) {
        this.advisorId = advisorId;
        this.advisorName = advisorName;
        this.expertise = expertise;
        this.availableSlots = availableSlots;
    }
}

module.exports = Advisor;