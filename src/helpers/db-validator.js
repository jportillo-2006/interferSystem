import Company from '../companies/company.model.js';

export const existeCompanyById = async (id = '') => {

    const existeCompany = await Company.findById(id);
 
    if(!existeCompany){
        throw new Error(`El id ${id} no existe.`);
    }
}

export const existenteEmail = async (correo = '') => {
    
    const existeEmail = await Company.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la base de datos.`);
    }
}

export const existentePhone = async (phone = '') => {
    
    const existePhone = await Company.findOne({ phone });

    if (existePhone) {
        throw new Error(`El telefono ${phone} ya existe en la base de datos.`);
    }
}