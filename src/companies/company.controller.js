import Company from './company.model.js';

export const registerCompany = async (req, res) => {
    try {
        
        const { name, impactLevel, yearsOfExperience, category, description, phone, email, representative } = req.body;

        if (!name || !impactLevel || !yearsOfExperience || !category || !phone || !email || !representative) {
            return res.status(400).json({ msg: 'Todos los campos obligatorios deben ser completados' });
        }

        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ msg: 'El email ya está registrado' });
        }

        const newCompany = new Company({
            name,
            impactLevel,
            yearsOfExperience,
            category,
            description,
            phone,
            email,
            representative
        });

        await newCompany.save();
        res.status(201).json({ msg: 'Empresa registrada con éxito', company: newCompany });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

export const getCompanies = async (req, res) => {
    try {

        let { category, yearsOfExperience, orderBy, orderDirection } = req.query;
        
        let query = {};

        if (category) {
            query.category = category;
        }

        if (yearsOfExperience) {
            query.yearsOfExperience = { $gte: Number(yearsOfExperience) };
        }

        let sort = {};
        if (orderBy) {
            let direction = orderDirection === 'desc' ? -1 : 1;
            sort[orderBy] = direction;
        }

        const companies = await Company.find(query).sort(sort);

        res.json({ total: companies.length, companies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

export const updateCompany = async (req, res) => {
    try {

        const { id } = req.params;
        const updates = req.body;

        const updatedCompany = await Company.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedCompany) {
            return res.status(404).json({ msg: 'Empresa no encontrada' });
        }

        res.json({ msg: 'Empresa actualizada con éxito', company: updatedCompany });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};