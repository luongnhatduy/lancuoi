import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,FlatList} from 'react-native';
import axios from 'axios';
//cai dmm

class FlatListItem extends Component{
  render(){
    return(
      <View>
        <Text>{this.props.item.id}</Text>
        <Text>{this.props.item.name}</Text>
      </View>
    );
  }
}

export default class App extends Component {

  constructor (props){
      super(props);
      this.state ={
        products : [], 
        loading: true
      };
  }
  
  componentDidMount() {
    this.getData()
  }

  getData = () =>{
    console.log('didaa');
    axios({
      method : 'GET',
      url : 'http://5cb6a480a3763800149fcbed.mockapi.io/api/products' ,
  
    }).then(res =>{   
      console.log(res.data);
      this.setState({
        products : res.data,
        loading: false
      });
    }).catch(err =>{
      this.setState({loading: false})
      console.log('loi',err);
    });
  }

  render() {
    console.log('ren');
    const { products ,loading } =this.state
    return (
      <FlatList
          data={products}
          keyExtractor= {this.keyExtractor}
          refreshing ={loading}
          onRefresh = {this.getData}
          renderItem={({item, index}) => {
            return (
              <FlatListItem item={item} index={index}>

              </FlatListItem>
              //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`)
            );
          }}
      >
       
      </FlatList>
    );
  }
  keyExtractor = (item, index) => index.toString()
}
