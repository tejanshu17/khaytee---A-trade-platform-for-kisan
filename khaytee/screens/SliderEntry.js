const { onPress } = this.props;
  render () 
{
    return (
      <TouchableOpacity onPress={() => { onPress('SIGNPAGE'); }} n>
        <Text> Move</Text>
      </TouchableOpacity>
    );
  }