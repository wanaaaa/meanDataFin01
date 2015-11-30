var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var JobSchema = Schema({
      userName: {type: String, required: false},
      jobName: {type: String, required: false},
      selectedList: [],
      joblist: []
    });

var JobModel = mongoose.model("JobModel", JobSchema);

module.exports = JobModel;

