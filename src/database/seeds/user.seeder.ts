import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Seeder } from 'typeorm-extension';
import { User } from 'src/module/users/entities/user.entity';

export class SuperadminSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const hashedPassword = await bcrypt.hash('password', 10);

    const userEntity = new User();
    userEntity.email = 'admin@gmail.com';
    userEntity.username = 'admin';
    userEntity.password = hashedPassword;
    userEntity.role = 'superadmin';
    userEntity.isActive = true;

    await userRepository.save(userEntity);

    console.log('user seeded successfully.');
  }
}
