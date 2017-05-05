/**
 * Created by  on 5/2/17.
 */

export default {
    getInitialState() {
        return {
            pressed: false
        }
    },

    handlePress() {
        this.setState({pressed: !this.state.pressed});
    }
}