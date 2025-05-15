import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'emailOrPhoneRequired', async: false })
export class EmailOrPhoneRequiredConstraint
  implements ValidatorConstraintInterface
{
  validate(_: any, args: ValidationArguments) {
    const object = args.object as any;
    return !!(object.email || object.phoneNumber); // ít nhất một trong hai tồn tại
  }

  defaultMessage() {
    return 'Either email or phoneNumber must be provided';
  }
}
