import { Injectable } from '@nestjs/common';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
@ValidatorConstraint()
export class UniqueFieldValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(value: keyof User, validationArguments?: ValidationArguments): Promise<boolean> {
        return !(await this.userService.findOneField(
            value,
            validationArguments.property as keyof User,
        ));
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return 'this ' + validationArguments.property + ' is register';
    }
}
