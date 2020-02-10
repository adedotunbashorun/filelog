class AbstractController {
    static repository;
    constructor(repository) {
        this.repository = repository;
    }

    static async index(req, res) {
        try {
            const data = await this.repository.findAll();
            return res.status(200).send({ success: true, data });
        } catch (error) {
            return res.status(401).json({ success: false, error, msg: error.message });
        }
    }

    static async destroy(req, res) {
        try {
            this.repository.forceDelete(req.params.id);
            return res.status(200).send({ success: true, msg: "record deleted successfully"});
        } catch (error) {
            return res.status(401).json({ success: false, error, msg: error.message });
        }

    }

    static async delete(req, res) {
        try {
            await this.repository.softDelete(req.params.id);
            return res.status(200).send({ success: true, msg: "record deleted successfully"});
        } catch (error) {
            return res.status(401).json({ success: false, error, msg: error.message });
        }
    }
}

module.exports = AbstractController