import React from "react";
import PropTypes from "prop-types";
import LngLat from "../../services/LngLat";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BehaviorProfiles from "../../services/statistics/StatisticalBehaviorProfiles";
import { downloadGPX, downloadKML } from "../../actions/downloadActions";
import searchMap from "../../store/searchMap";
import MarkerManager from "./components/MarkerManager";
import SidebarSection from "./components/SidebarSection";
import Subscribe from "./components/Subscribe";
import ProfileSelector from "./components/ProfileSelector";
import BehaviorStats from "./components/BehaviorStats";
import "./sidebar.css";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.searchMap = searchMap;
  }
  addDestinationMarker() {
    if (this.props.ipp) {
      const lngLat = new LngLat(this.props.ipp.lngLat).moveTo(0, 2000);
      searchMap.setDestinationMarker(lngLat);
    } else {
      const lngLat = new LngLat(this.props.mapCenter);
      searchMap.setDestinationMarker(lngLat);
    }
  }
  setMarkerLngLat = (markerId, lngLat) => {
    switch (markerId) {
      case "ipp":
        return this.searchMap.setIPPMarker(lngLat);
      case "direction":
        return this.searchMap.setDestinationMarker(lngLat);
      default:
        throw new Error(`Marker id ${markerId} is not recognized.`);
    }
  };
  removeMarker = (markerId) => {
    switch (markerId) {
      case "ipp":
        return this.searchMap.clearIPPMarker();
      case "direction":
        return this.searchMap.clearDestinationMarker();
      default:
        throw new Error(`Marker id ${markerId} is not recognized.`);
    }
  };
  render() {
    const { downloadGPX, downloadKML } = this.props;
    if (this.props.isOpen === false) return null;
    const profiles = new BehaviorProfiles().getProfiles();
    return (
      <div className="sidebar__wrapper">
        <div className="sidebar__content">
          <div className="sidebar__heading">
            <h1 className="title">Mapeamento Inicial Busca Terrestre</h1>
            <div className="author">
              feito por <a href="mailto: ryan@sarmapper.org">Ryan Villanueva,</a> e adaptado pelo <a>Sd. QPBM <b>Da Maia</b></a>
            </div>
            <div className="=author">
              <a className="author" href="https://12gb.notion.site/BUSCA-TERRESTRE-e4d175da04e04ff3b0b823d2e895c601">
                      Clique aqui para INSTRUÇÕES DE USO
              </a>
            </div>
            <div className="author">
              Após pesquisa preliminar, insira o Último Local Visto (ULV) da busca na aba Marcadores. 
              Caso haja um perfil bem definido, é possível utilizar a base de dados como referência dos raios de probabilidade.
            </div>
          </div>
          <div>
            <SidebarSection name="Marcadores">
              <div className="sidebar-section__padding">
                <MarkerManager
                  name="Último Local Visto (ULV)" 
                  lngLat={this.props.ipp ? this.props.ipp.lngLat : null}
                  setLngLat={(lngLat) => this.setMarkerLngLat("ipp", lngLat)}
                  remove={() => this.removeMarker("ipp")}
                  flyTo={(lngLat) => this.searchMap.flyTo(lngLat)}
                  mapLngLat={this.props.mapCenter}
                />

                <MarkerManager
                  name="Direção da viagem"
                  lngLat={
                    this.props.direction ? this.props.direction.lngLat : null
                  }
                  setLngLat={(lngLat) =>
                    this.setMarkerLngLat("direction", lngLat)
                  }
                  remove={() => this.removeMarker("direction")}
                  flyTo={this.searchMap.flyTo}
                  mapLngLat={this.props.mapCenter}
                />
              </div>
            </SidebarSection>
            <SidebarSection name="Perfil Comportamental">
              <div className="sidebar-section__padding">
                {this.props.behavior ? (
                  <ProfileSelector
                    profiles={profiles}
                    behavior={this.props.behavior}
                    setBehaviorByKeys={this.props.setBehaviorByKeys}
                  />
                ) : null}
                {this.props.behavior ? (
                  <BehaviorStats behavior={this.props.behavior} />
                ) : null}
                <div className="Fonte">
                  Source:{" "}
                  <a href="https://www.dbs-sar.com/SAR_Research/ISRID.htm">
                    International Search &amp; Rescue Incident Database
                  </a>{" "}
                  (2011)
                  
                  <div className="author">
                    O perfil <b>“Geral”</b> NÃO faz parte da base de dados do ISRID. 
                    É apenas uma adaptação realizada local e empiricamente para auxiliar o planejamento 
                    das buscas quando o perfil comportamental da vítima não foi apurado.
                  </div>

                </div>
              </div>
            </SidebarSection>
            <SidebarSection name="Exportar">
              <div className="sidebar-section__padding">
                <button onClick={downloadGPX}>Download GPX</button>
                <button onClick={downloadKML}>Download KML</button>
              </div>
            </SidebarSection>
            <SidebarSection name="Sobre">
              <div className="sidebar-section__padding bylines">
                <p>
                  Interface e visualização feita por{" "}
                  <a href="mailto:ryan@sarmapper.org">Ryan Villanueva</a>.
                </p>
                <p>
                  Dados estatísticos de comportamento {" "}
                  <a href="http://www.dbs-sar.com/">Lost Person Behavior</a> por
                  Robert Koester.
                  <br />
                </p>
                <p>
                  Código-fonte disponível em{" "}
                  <a href="https://github.com/rvillanueva/sarmapper">Github</a>.
                </p>
                <p>
                  O Lost Person Behavior Mapper não garante que o
                  as informações fornecidas são 100% precisas. Pretende-se que seja
                  usado como uma ferramenta suplementar para esforços de busca e salvamento e
                  não pode substituir outras técnicas de pesquisa. Se você estiver procurando
                  uma pessoa desaparecida, entre em contato com as autoridades locais
                  imediatamente.
                </p>
              </div>
            </SidebarSection>
            <Subscribe />
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  ipp: PropTypes.object,
  direction: PropTypes.object,
  behavior: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    mapCenter: state.map.center,
    ipp: state.markers.byId.ipp,
    direction: state.markers.byId.direction,
    behavior: state.behavior,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    downloadGPX: bindActionCreators(downloadGPX, dispatch),
    downloadKML: bindActionCreators(downloadKML, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
