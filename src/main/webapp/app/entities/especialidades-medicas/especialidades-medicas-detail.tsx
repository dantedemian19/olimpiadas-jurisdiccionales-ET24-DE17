import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './especialidades-medicas.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEspecialidadesMedicasDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EspecialidadesMedicasDetail = (props: IEspecialidadesMedicasDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { especialidadesMedicasEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="especialidadesMedicasDetailsHeading">
          <Translate contentKey="pruebaApp.especialidadesMedicas.detail.title">EspecialidadesMedicas</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{especialidadesMedicasEntity.id}</dd>
          <dt>
            <span id="especialidad">
              <Translate contentKey="pruebaApp.especialidadesMedicas.especialidad">Especialidad</Translate>
            </span>
          </dt>
          <dd>{especialidadesMedicasEntity.especialidad}</dd>
        </dl>
        <Button tag={Link} to="/especialidades-medicas" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/especialidades-medicas/${especialidadesMedicasEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ especialidadesMedicas }: IRootState) => ({
  especialidadesMedicasEntity: especialidadesMedicas.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadesMedicasDetail);
