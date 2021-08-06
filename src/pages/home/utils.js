import classrooms from "../algorithm/classrooms";

export const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];

export const rangeArray = (start, end) => {
    return [...Array(end).keys()].filter(x => x >= start);
}

export const intValue = (numString) => Number.parseInt(numString);
export const pairSplit=(pairString,pos)=>pairString.split('-')[pos]

export const pObject = (period = 'Mon-00-00') => {
    return {
        day: period.split('-')[0],
        start: intValue(period.split('-')[1]),
        end: intValue(period.split('-')[2])
    }
}

export const rangeWithPeriod = (period) => {
    const {start, end} = pObject(period);
    return rangeArray(start, end);
}

export const doIntersect = (fPeriod, sPeriod) => {
    if (pObject(fPeriod).day === pObject(sPeriod).day) {
        return rangeWithPeriod(fPeriod).filter(x => rangeWithPeriod(sPeriod).includes(x)).length > 0
    } else {
        return false
    }
}


export const getLecturer = (pairId) => pairId.split('-')[0];


export const getRandomClassroom = (period, batchSize,sessions) => {
    let randomRoom = null;
    let fitClasses = classrooms.filter(classroom => classroom.size >= batchSize);
    do {
        randomRoom = fitClasses[Math.floor(Math.random() * fitClasses.length)];
        if (randomRoom === undefined) {
            randomRoom = {id: 'UNDEFINED', size: null}
        }
    } while ((sessions.some(session => session.period === period && session.classroom === randomRoom.id)));

    if (randomRoom.size >= batchSize) {
        return randomRoom.id
    } else {
        return 'UNDEFINED'
    }
}

export const getRandomTime =  (hours, lecturerId, batchId, schedules) => {
    let sampletime = 'Mon-00-00';
    const sFreePeriods = studentFreeTime(batchId, hours, schedules);
    const lFreePeriods = lecturerFreeTime(lecturerId, hours, schedules);
    const bestTimes = sFreePeriods.filter(x => lFreePeriods.includes(x));
    if (bestTimes !== []) {
        sampletime = bestTimes[Math.floor(Math.random() * bestTimes.length)]
    }

    return sampletime;
}

const studentFreeTime =  (batchId, time, schedules) => {
    const currentSchedule =schedules.map(session => {
        if (session.batch_id === batchId) {
            return session.period;
        }
    });
    return possibleSet(time, 11).filter(x => !currentSchedule.some(y => doIntersect(x, y)));
}
const lecturerFreeTime =  (lecturerId, time, schedules) => {
    const currentSchedule = schedules.map(session => {
        if (getLecturer(session.pair_id) === lecturerId) {
            return session.period;
        }
    });
    return possibleSet(time, 11).filter(x => !currentSchedule.some(y => doIntersect(x, y)));//Change the 12 to 11
}

const possibleSet = (duration, maxPeriod) => {
    let freePeriod = [];
    days.forEach(day => {
        let count = 1;
        while (count <= (maxPeriod - (duration - 1))) {
            freePeriod.push(`${day}-${count}-${count + duration}`);
            count++;
        }
    });
    return freePeriod;
}