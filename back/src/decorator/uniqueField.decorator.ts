import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueFieldValidator } from 'src/validator/uniqueField';

export function UniqueField(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'UniqueFueld',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UniqueFieldValidator,
        });
    };
}
