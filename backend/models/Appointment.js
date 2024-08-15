// backend/models/Appointment.js
class Appointment {
    constructor(appointmentId, learnerId, advisorId, meetingDuration, scheduledTime) {
        this.appointmentId = appointmentId;
        this.learnerId = learnerId;
        this.advisorId = advisorId;
        this.meetingDuration = meetingDuration;
        this.scheduledTime = scheduledTime;
    }
}

module.exports = Appointment;