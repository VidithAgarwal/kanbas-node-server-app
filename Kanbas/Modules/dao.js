import Database from "../Database/index.js";
import model from "./model.js";
export function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({ _id: moduleId }, moduleUpdates);
    
  }
  
   
   export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
    // const { modules } = Database;
    // Database.modules = modules.filter((module) => module._id !== moduleId);
   }
   
   
  export function createModule(module) {
    delete module._id
    return model.create(module);
   }
   
  
export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
  // const { modules } = Database;
  // return modules.filter((module) => module.course === courseId);
 }
 