import ExcelJS from 'exceljs';
import Company from '../companies/company.model.js';

export const excelCompanies = async (req, res) => {
    try {
        const companies = await Company.find();

        if (!companies.length) {
            return res.status(404).json({ msg: 'No hay empresas registradas' });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nombre', key: 'name', width: 25 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 20 },
            { header: 'Años de Trayectoria', key: 'yearsOfExperience', width: 15 },
            { header: 'Categoría', key: 'category', width: 20 },
            { header: 'Descripción', key: 'description', width: 30 },
            { header: 'Teléfono', key: 'phone', width: 15 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Representante', key: 'representative', width: 25 },
        ];

        companies.forEach((company) => {
            worksheet.addRow({
                id: company.id,
                name: company.name,
                impactLevel: company.impactLevel,
                yearsOfExperience: company.yearsOfExperience,
                category: company.category,
                description: company.description || 'N/A',
                phone: company.phone,
                email: company.email,
                representative: company.representative,
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=companies.xlsx');

        res.send(Buffer.from(buffer));
    } catch (error) {
        console.error('Error al exportar a Excel:', error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};