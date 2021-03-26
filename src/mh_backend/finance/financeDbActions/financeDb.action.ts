import { ObjectId } from 'bson';
import { Model } from 'mongoose';
import { UserDocument } from '../../../main_backend/auth/schema/user.schema';
import { BaseFinanceDto, FinanceTransferDto } from '../dto/financeTransfer.dto';
import { validateFinanceType } from '../enums/financeType.enums';

export const getFinanceData = async (
  userModel: Model<UserDocument>,
  baseFinanceDto: BaseFinanceDto,
) => {
  const id = baseFinanceDto._id;
  const financeType = validateFinanceType(baseFinanceDto);

  const response = await userModel.findOne({ _id: id }, [financeType]);
  return response;
};

export const insertFinanceData = async (
  userModel: Model<UserDocument>,
  financeTransferDto: FinanceTransferDto,
) => {
  const amount = parseFloat(financeTransferDto.amount);
  const description = financeTransferDto.description.toString();
  const date = new Date();
  const financeType = validateFinanceType(financeTransferDto);
  const id = financeTransferDto._id;

  const response = await userModel.updateOne(
    { _id: id },
    {
      $push: {
        [financeType]: {
          _id: new ObjectId(),
          description: description,
          amount: amount,
          date: date,
        },
      },
    },
    { upsert: true },
  );

  return response;
};

export const deleteFinanceData = async (
  baseFinanceDto: BaseFinanceDto,
  userModel: Model<UserDocument>,
) => {
  const itemID = baseFinanceDto._id;
  const financeType = validateFinanceType(baseFinanceDto);

  const response = await userModel.updateOne(
    {},
    {
      $pull: { [financeType]: { _id: new ObjectId(`${itemID}`) } },
    },
  );
  return response;
};
