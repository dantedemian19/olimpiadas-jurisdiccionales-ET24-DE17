"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const historia_clinica_mapper_1 = require("../service/mapper/historia-clinica.mapper");
const historia_clinica_repository_1 = require("../repository/historia-clinica.repository");
const relationshipNames = [];
let HistoriaClinicaService = class HistoriaClinicaService {
    constructor(historiaClinicaRepository) {
        this.historiaClinicaRepository = historiaClinicaRepository;
        this.logger = new common_1.Logger('HistoriaClinicaService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.historiaClinicaRepository.findOne(id, options);
        return historia_clinica_mapper_1.HistoriaClinicaMapper.fromEntityToDTO(result);
    }
    async findByFields(options) {
        const result = await this.historiaClinicaRepository.findOne(options);
        return historia_clinica_mapper_1.HistoriaClinicaMapper.fromEntityToDTO(result);
    }
    async findAndCount(options) {
        options.relations = relationshipNames;
        const resultList = await this.historiaClinicaRepository.findAndCount(options);
        const historiaClinicaDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(historiaClinica => historiaClinicaDTO.push(historia_clinica_mapper_1.HistoriaClinicaMapper.fromEntityToDTO(historiaClinica)));
            resultList[0] = historiaClinicaDTO;
        }
        return resultList;
    }
    async save(historiaClinicaDTO, creator) {
        const entity = historia_clinica_mapper_1.HistoriaClinicaMapper.fromDTOtoEntity(historiaClinicaDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.historiaClinicaRepository.save(entity);
        return historia_clinica_mapper_1.HistoriaClinicaMapper.fromEntityToDTO(result);
    }
    async update(historiaClinicaDTO, updater) {
        const entity = historia_clinica_mapper_1.HistoriaClinicaMapper.fromDTOtoEntity(historiaClinicaDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        await this.historiaClinicaRepository.update(entity.id, entity);
        return historiaClinicaDTO;
    }
    async deleteById(id) {
        await this.historiaClinicaRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
HistoriaClinicaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(historia_clinica_repository_1.HistoriaClinicaRepository)),
    __metadata("design:paramtypes", [historia_clinica_repository_1.HistoriaClinicaRepository])
], HistoriaClinicaService);
exports.HistoriaClinicaService = HistoriaClinicaService;
//# sourceMappingURL=historia-clinica.service.js.map