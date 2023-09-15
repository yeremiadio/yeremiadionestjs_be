import { QueryParams } from 'src/common/dto';
import { SelectQueryBuilder } from 'typeorm';

export const generatePaginationQuery = async <T>(
  queryBuilder: SelectQueryBuilder<T>,
  filterDto: QueryParams,
) => {
  queryBuilder.take(filterDto.take);
  if ((filterDto.page - 1) * filterDto.take) {
    queryBuilder.skip((filterDto.page - 1) * filterDto.take);
  }
  const entities = await queryBuilder.getMany();
  const itemCount = await queryBuilder.getCount();

  const meta = {
    page: +filterDto.page,
    offset: +filterDto.take,
    itemCount,
    pageCount: Math.ceil(itemCount / filterDto.take)
      ? Math.ceil(itemCount / filterDto.take)
      : 0,
  };

  return {
    entities,
    meta,
  };
};
