import { hash } from 'argon2';
import User from '../src/user/user.model.js';

export const createAdminUser = async () => {
    try {
        const adminExists = await User.findOne({ role: 'ADMIN_ROLE' });

        if (!adminExists) {

            const hashedPassword = await hash('panito123');

            const adminUser = new User({
                username: 'Admin',
                email: 'admin@email.com',
                password: hashedPassword,
                role: 'ADMIN_ROLE'
            });

            await adminUser.save();
            console.log('Administrador creado');
        } else {
            console.log('El administrador ya existe.');
        }
    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    }
};

export default createAdminUser;