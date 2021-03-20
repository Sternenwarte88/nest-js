import { ObjectId } from 'bson';
import { Model } from 'mongoose';
import { UserDocument } from 'src/mh_backend/auth/schema/user.schema';
import { FinanceTransferDto } from '../dto/financeTransfer.dto';
import { validateFinanceType } from '../enums/financeType.enums';

export const insertFinanceData = async (
  userModel: Model<UserDocument>,
  financeTransferDto: FinanceTransferDto,
) => {
  const amount = parseFloat(financeTransferDto.amount);
  const description = financeTransferDto.description.toString();
  const date = new Date();
  const financeType = validateFinanceType(financeTransferDto);
  const id = financeTransferDto._id;
  userModel = userModel;

  const result = await userModel.updateOne(
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

  return result;
};
