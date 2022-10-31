import { Role, RoleInput } from '../models/role';
import { faker } from '@faker-js/faker';
const roleSeed: () => Promise<void> = async () => {
    const roles: RoleInput[] = [];

    for (let index = 0; index < 10; index++) {
        roles.push({
            name: faker.name.jobTitle(),
            description: faker.lorem.lines(1),
        });
    }
    console.log(roles);

    const data = await Role.insertMany(roles);
    console.log(data);
};

export { roleSeed };
