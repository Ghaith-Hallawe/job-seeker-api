import { selectionOptionsMap } from '../constant/selection';
import { employmentTypesMap } from '../constant/employment-types';
import { experiencesMap } from '../constant/experience';
import { jobCategoriesMap } from '../constant/job-category';
import { jobStatusesMap } from '../constant/job-status';
import library from '../models/index';

class ResourcesService {
  public async getJobPostResources() {
    return {
      selection: [...selectionOptionsMap.values()],
      employment_type: [...employmentTypesMap.values()],
      job_category: [...jobCategoriesMap.values()],
      job_status: [...jobStatusesMap.values()],
      experience: [...experiencesMap.values()],
    };
  }
  public async getCountries() {
    const result = library['Countries'].findAll({
      attributes: ['id', 'name', 'key'],
    });
    return result;
  }
}

export default new ResourcesService();
