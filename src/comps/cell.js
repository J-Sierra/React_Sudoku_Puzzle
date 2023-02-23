import React, {Component}             from 'react';
import "./styles/cell.scss"
import {onCellChange, onCellSelected} from "./redux/actions/actions";
import {connect}                      from "react-redux";
import BubbleRing                     from "./bubbleRing";

class Cell extends Component {
    state = {
        editable: true,
        editing : false,
        selected: false
    }
    
    componentDidMount() {
        if(this.props.cell.number) {
            this.setState({
                              ...this.state,
                              editable: false
                          })
        }
    }
    
    render() {
        let {cell} = this.props
        let {selected} = cell
        let {
                editing,
                editable
            } = this.state
        let cellData = cell.number
        
        return (
            
            <div className={editable
                ? "cell"
                : "boldCell"}
                //style={cellSelected ? {backgroundColor: "lightblue"} : null}
                 style={selected
                     ? {backgroundColor: "gray"}
                     : null}
                 onClick={this.selectCell}
                 onBlur={this.toggle}>
                {!editing
                    ? cellData
                        ? cellData
                        : null
                    :
                    <>
                        <input
                            id={"cellInput"}
                            type="text"
                            autoComplete={"off"}
                            autoFocus={true}
                            maxLength={1}
                            onChange={this.handleOnChange}
                            placeholder={cellData}
                        />
                        <BubbleRing
                            cellChange={this.handleOnChange}
                            cell={cell}/>
                    </>
                    
                }
            
            </div>
        );
    }
    
    selectCell = () => {
        let {
                cellSelected,
                cell
            } = this.props
        this.toggle()
        cellSelected(cell)
        
    }
    
    toggle = () => {
        let {
                editable,
                editing
            } = this.state
        
        if(editable) this.setState({editing: !editing})
        
    }
    
    handleOnChange = (e) => {
        let {
                cellOnChange,
                cell
            } = this.props
        let {value} = e.target
        
        !isNaN(value) && value !== '0'
            ? cellOnChange(value, cell)
            : cellOnChange(null, cell)
        
        this.toggle()
    }
    
}

const mapStateToProps = (state, ownProps) => {
    const {
              gameBoard,
              sectors,
              gameBoardReady
          } = state.gameBoardReducer
    return {
        gameBoard,
        sectors,
        gameBoardReady,
        
    }
}

function mapActionsToProps() {
    return {
        cellOnChange: onCellChange,
        cellSelected: onCellSelected
    }
}

export default connect(mapStateToProps, mapActionsToProps())(Cell)
