const SortingResult = (taskArray, dependencyArray) => {
    let result = []; // result which has to be pushed
    if (taskArray.length <= 0 && dependencyArray.length <= 0) {
        return result;
    }
    else if (taskArray.length > 0 && dependencyArray.length === 0) {
        return result = taskArray;
    }
    else if (taskArray.length > 0 && dependencyArray.length > 0) {
        let matchArrKey = [];
        cyclic = 0;
        // loop of task and check it in dependency Array
        taskArray.map((task) => {
            let check = false;
            // loop of dependencies and distribute accordingly
            dependencyArray.map((curDepen) => {
                let dependent = curDepen.substr(0, 1); // first letter of string
                let dependentOn = curDepen.substr(-1, 1);// last letter of string
                if (task === dependent) {
                    check = true;
                    // filter the  keys with values and dependencies 
                    let dependArray = matchArrKey.filter(obj => obj.key === dependentOn);
                    if (dependArray.length > 0) {
                        result = [];
                        cyclic = 1;
                        return result = "Error - this is a cyclic dependency";
                    }
                    else {
                        // array creation of task according to thier dependencies and dependent
                        matchArrKey.push({ "key": dependent, "value": dependentOn });
                    }
                }
            })
            if (!check) {
                // if the dependencies of key are not there
                let dependArraySecond = matchArrKey.filter(obj => obj.value === task);
                if (dependArraySecond.length > 0) {
                    result.push(dependArraySecond[0].value);
                    // match and filter the key in dependency array
                    let key = dependArraySecond[0].key;
                    let Dependent = matchArrKey.filter(obj => obj.value === key);
                    if (Dependent.length > 0) {
                        result.push(Dependent[0].value);
                        result.push(Dependent[0].key);
                    }
                    else {
                        result.push(key);
                    }
                }
                // check for task is not persent in dependency array of obj
                if (!result.includes(task)) {
                    result.push(task)
                }
            }
        })
        return result;
    }
};

module.exports = SortingResult;