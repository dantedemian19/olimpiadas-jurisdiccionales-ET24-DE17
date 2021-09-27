import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { MedicoDTO } from '../src/service/dto/medico.dto';
import { MedicoService } from '../src/service/medico.service';

describe('Medico Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(MedicoService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all medicos ', async () => {
        const getEntities: MedicoDTO[] = (await request(app.getHttpServer()).get('/api/medicos').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET medicos by id', async () => {
        const getEntity: MedicoDTO = (
            await request(app.getHttpServer())
                .get('/api/medicos/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create medicos', async () => {
        const createdEntity: MedicoDTO = (
            await request(app.getHttpServer()).post('/api/medicos').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update medicos', async () => {
        const updatedEntity: MedicoDTO = (
            await request(app.getHttpServer()).put('/api/medicos').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update medicos from id', async () => {
        const updatedEntity: MedicoDTO = (
            await request(app.getHttpServer())
                .put('/api/medicos/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE medicos', async () => {
        const deletedEntity: MedicoDTO = (
            await request(app.getHttpServer())
                .delete('/api/medicos/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
