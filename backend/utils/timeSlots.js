
let timeSlots = [
    "9:00 am",
    "9:30 am",
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 pm",
    "12:30 pm",
    "2:30 pm",
    "3:00 pm",
    "3:30 pm",
    "4:00 pm",
    "5:00 pm",
    "5:30 pm",
    "6:00 pm",
    "6:30 pm",
    "7:00 pm",
    "7:30 pm",
    "8:00 pm",
    "8:30 pm"
]

// const checkTime = (slot) => {
//     time = formatAMPM(new Date());
//     time = time.toString();
//     const am = time.includes("am");
//     if (am) {
//         return time < slot;
//     } else {
//         if (slot.includes("am")) {
//             return false;
//         } else {
//             return time < slot;
//         }
//     }
// };

exports.getSlots = (times) => {
    let availableTime = [];
    for (let i = 0; i < timeSlots.length; i++) {
        let timeSlot = timeSlots[i];
        let timeSlotIndex = times.indexOf(timeSlot);
        if (timeSlotIndex === -1) {
            // if (checkTime(timeSlot)) {
            // }
            availableTime.push(timeSlots[i]);
        }
    }
    return availableTime;
};



// let slots=[
//     "12:00 pm",
//     "12:30 pm",
//     "2:30 pm",
//     "3:00 pm",
//     "3:30 pm",
//     "4:00 pm",
//     "5:00 pm",
//     "5:30 pm"
// ]
// console.log(getSlots(slots));
