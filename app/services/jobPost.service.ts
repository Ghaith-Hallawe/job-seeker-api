import messagesConstants from '../constant/messages.constants';
import httpConstants from '../constant/http.constants';
import library from '../models/index';
import { JobRequest } from '../types/job.type';
import { ErrorType } from '../types/error.type';
import ErrorHandler from '../helpers/request.handler';
import { Op } from 'sequelize';
import config from '../../config/paging.config';
class JobPostService {
  private modelName = 'JobPosts';

  public async create(jobData: JobRequest) {
    return await library[this.modelName]
      .build(jobData)
      .save()
      .then(
        ErrorHandler.throwIf(
          (r: ErrorType) => !r,
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'Internal server error',
          messagesConstants.CREATE_WENT_WRONG,
        ),
        ErrorHandler.throwError(
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'sequelize error',
          '',
        ),
      )
      .then((savedResource: Promise<JobRequest>) =>
        Promise.resolve(savedResource),
      );
  }
  // ---------------------

  public async update(jobData: JobRequest) {
    await this.find(jobData.id, jobData.user_id);

    const result = await library[this.modelName]
      .update(jobData, {
        where: {
          id: jobData.id,
          user_id: jobData.user_id,
        },
      })
      .then(
        ErrorHandler.throwIf(
          (r: ErrorType) => !r,
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'Internal server error',
          messagesConstants.UPDATE_WENT_WRONG,
        ),
        ErrorHandler.throwError(
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'sequelize error',
          '',
        ),
      );

    return result;
  }
  // ---------------------
  public async delete(id: number, user_id: number) {
    await this.find(id, user_id);

    const result = await library[this.modelName]
      .destroy({
        where: {
          id: id,
          user_id: user_id,
        },
      })
      .then(
        ErrorHandler.throwIf(
          (r: ErrorType) => !r,
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'Internal server error',
          messagesConstants.DELETE_WENT_WRONG,
        ),
        ErrorHandler.throwError(
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'sequelize error',
          '',
        ),
      );

    return result;
  }
  // ---------------------

  public async getById(id: number, user_id: number) {
    const result = this.find(id, user_id);
    return result;
  }

  // ---------------------

  public async getAll({
    term = '',
    page = config.pagination.page,
    limit = config.pagination.limit,
  }) {
    const offset = limit * (page - 1);
    const searchFilter =
      term?.length > 0
        ? {
            [Op.or]: [
              { emfname: { [Op.like]: `%${term}%` } },
              { emlname: { [Op.like]: `%${term}%` } },
            ],
          }
        : {};
    const jobPost = await library[this.modelName].findAll({
      where: {
        ...searchFilter,
      },
      include: [
        {
          model: library['Countries'],
          required: true,
          attributes: ['id', 'name'],
        },
        {
          model: library['Users'],
          required: true,
          attributes: ['id', 'name'],
        },
      ],

      offset: offset,
      limit: Number(limit),
    });

    if (!jobPost) {
      ErrorHandler.throwError(
        httpConstants.HTTP_BAD_REQUEST,
        'bad request',
        messagesConstants.RESOURCE_NOT_FOUND,
      )();
    }
    return jobPost;
  }

  public async getMyJobs({
    id,
    term = '',
    page = config.pagination.page,
    limit = config.pagination.limit,
  }) {
    const offset = limit * (page - 1);
    const searchFilter =
      term?.length > 0
        ? {
            [Op.or]: [
              { emfname: { [Op.like]: `%${term}%` } },
              { emlname: { [Op.like]: `%${term}%` } },
            ],
          }
        : {};
    const jobPost = await library[this.modelName].findAll({
      where: {
        ...searchFilter,
        user_id: id,
      },
      include: [
        {
          model: library['Countries'],
          required: true,
          attributes: ['id', 'name'],
        },
        {
          model: library['Users'],
          required: true,
          attributes: ['id', 'name'],
        },
      ],
      offset: offset,
      limit: Number(limit),
    });

    if (!jobPost) {
      ErrorHandler.throwError(
        httpConstants.HTTP_BAD_REQUEST,
        'bad request',
        messagesConstants.RESOURCE_NOT_FOUND,
      )();
    }
    return jobPost;
  }

  private async find(id: number, user_id: number) {
    const jobPost = await library[this.modelName].findOne({
      where: {
        id: id,
        // user_id: user_id,
      },
      include: [
        {
          model: library['Countries'],
          required: true,
          attributes: ['id', 'name'],
        },
        {
          model: library['Users'],
          required: true,
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!jobPost) {
      ErrorHandler.throwError(
        httpConstants.HTTP_BAD_REQUEST,
        'bad request',
        messagesConstants.RESOURCE_NOT_FOUND,
      )();
    }

    return jobPost;
  }
}

export default new JobPostService();
