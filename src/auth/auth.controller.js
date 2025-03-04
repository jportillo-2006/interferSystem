import Usuario from '../user/user.model.js';
import { generarJWT} from '../helpers/generate-jwt.js';
import { verify } from 'argon2';

export const login = async (req, res) => {

    const { email, password, username } = req.body;

    try {
        if (!email && !username) {
            return res.status(400).json({
                msg: 'Debes agregar el email o el username'
            });
        }

        const user = await Usuario.findOne({
            $or: [{ email }, { username }]
        });

        if(!user){
            return res.status(400).json({
                msg: 'Credenciales incorrectas'
            });
        }

        const validPassword = await verify(user.password, password);
        
        if(!validPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }

        const token = await generarJWT(user.id);

        return res.status(200).json({
            msg: 'Inicio de sesión exitoso!!',
            userDetails: {
                token: token,
            }
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            message: 'Server error',
            error: e.message
        });
    }
};