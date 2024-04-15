import messagesConstants from '../constant/messages.constants';
import httpConstants from '../constant/http.constants';
import library from '../models/index';
import { ErrorType } from '../types/error.type';
import ErrorHandler from '../helpers/request.handler';
import config from '../../config/paging.config';

import { JobApplicationRequest } from '../types/jobapplication.type';
import { FileType } from '../types/file.type';
import fileConfig from '../../config/files.config';
import AwsS3Client from '../modules/Awsbucket';
class JobApplicationService {
  private modelName = 'JobApplications';

  public async create(jobAppData: JobApplicationRequest, file: FileType | undefined) {
    await this.checkJobPostExist(jobAppData.job_post_id);
    if(file){
      this.uploadFile(jobAppData, file);
    }
    return await library[this.modelName]
      .build(jobAppData)
      .save()
      .then(
        ErrorHandler.throwIf(
          (r: ErrorType) => !r,
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'Internal server error',
          messagesConstants.CREATE_WENT_WRONG
        ),
        ErrorHandler.throwError(
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'sequelize error',
          ''
        )
      )
      .then((savedResource: Promise<JobApplicationRequest>) =>
        Promise.resolve(savedResource)
      );
  }

  // ---------------------

  public async update(jobAppData: JobApplicationRequest, file: FileType | undefined) {
    await this.findJobApp(jobAppData.id, jobAppData.user_id);
    if(file){
      this.uploadFile(jobAppData, file);
    }
    const result = await library[this.modelName]
      .update(jobAppData, {
        where: {
          id: jobAppData.id,
          user_id: jobAppData.user_id
        }
      })
      .then(
        ErrorHandler.throwIf(
          (r: ErrorType) => !r,
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'Internal server error',
          messagesConstants.UPDATE_WENT_WRONG
        ),
        ErrorHandler.throwError(
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'sequelize error',
          ''
        )
      );

    return result;
  }
  // ---------------------
  public async delete(id: number, userId: number) {
    await this.findJobApp(id, userId);

    const result = await library[this.modelName]
      .destroy({
        where: {
          id: id,
          user_id: userId
        }
      })
      .then(
        ErrorHandler.throwIf(
          (r: ErrorType) => !r,
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'Internal server error',
          messagesConstants.DELETE_WENT_WRONG
        ),
        ErrorHandler.throwError(
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'sequelize error',
          ''
        )
      );

    return result;
  }
  // ---------------------

  public async getById(id: number, userId: number) {
    const jobApplication = await library[this.modelName].findOne({
      include: {
        model: library['JobPosts'],
        attributes: ['id', 'title', 'user_id'],
        include: {
          model: library['Users'],
          attributes: ['id', 'name']
        }
      },
      where: {
        id,
        user_id: userId
      }
    });
    if (!jobApplication) {
      ErrorHandler.throwError(
        httpConstants.HTTP_BAD_REQUEST,
        'bad request',
        messagesConstants.RESOURCE_NOT_FOUND
      )();
    }
    return jobApplication;
  }

  // ---------------------

  public async getAll({
    userId,
    page = config.pagination.page,
    limit = config.pagination.limit,
    jobPostId
  }) {
    const offset = limit * (page - 1);
    let whereConditions: any = { user_id: userId };
    if (jobPostId) {
      whereConditions = { job_post_id: jobPostId, ...whereConditions };
    }
    const jobApplications = await library[this.modelName].findAll({
      where: whereConditions,
      offset: offset,
      limit: Number(limit)
    });
    if (!jobApplications) {
      ErrorHandler.throwError(
        httpConstants.HTTP_BAD_REQUEST,
        'bad request',
        messagesConstants.RESOURCE_NOT_FOUND
      )();
    }
    return jobApplications;
  }

  // ---------------------

  private async findJobApp(id: number, userId: number) {
    const jobApplication = await library[this.modelName].findOne({
      where: {
        id,
        user_id: userId
      }
    });
    if (!jobApplication) {
      ErrorHandler.throwError(
        httpConstants.HTTP_BAD_REQUEST,
        'bad request',
        messagesConstants.RESOURCE_NOT_FOUND
      )();
    }
  }

  // ---------------------

  private async checkJobPostExist(id: number) {
    const jobPost = await library['JobPosts'].findOne({
      where: {
        id
      }
    });
    if (!jobPost) {
      ErrorHandler.throwError(
        httpConstants.HTTP_BAD_REQUEST,
        'bad request',
        messagesConstants.UNABLE_TO_FIND_JOB_POST
      )();
    }
  }
  
  // -----------------------

  private uploadFile(jobApplication: JobApplicationRequest, file: FileType): void {
    if(file){
      const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      const directoryPath = `${fileConfig.jobApplication.uploadPrefix}${jobApplication.job_post_id}/Interns/${jobApplication.user_id}/${date}/`;
      const key = `${directoryPath}${file.originalname}`;
      AwsS3Client.uploadToS3Bucket(file.buffer, key);
    }
  }
}
export default new JobApplicationService();
