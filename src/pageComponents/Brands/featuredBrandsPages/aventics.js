import React, { useState, useContext } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Context from '../../../config/context'
import { faAutoprefixer } from '@fortawesome/free-brands-svg-icons'
import ShowMoreText from 'react-show-more-text';

class Foo extends Component {
 
  executeOnClick(isExpanded) {
      console.log(isExpanded);
  }

  render() {
      return (
          <ShowMoreText
              /* Default options */
              lines={3}
              more='Show more'
              less='Show less'
              anchorClass=''
              onClick={this.executeOnClick}
              expanded={false}
              width={280}
          >
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur tellus mi, ac euismod nisi suscipit vitae. Duis vehicula nibh quis felis tempor vulputate. Nunc non fringilla nisl, et malesuada elit. Etiam vel purus justo. Suspendisse imperdiet ultricies odio, porttitor iaculis ante iaculis ut. Aenean in sapien metus. Integer et arcu sodales, rhoncus neque eget, imperdiet mauris. Duis rhoncus ex ex, vitae fringilla sem tempor ut. In sed ante varius mauris auctor congue id at orci. Sed nibh diam, bibendum non pretium a, ornare ut velit. Phasellus egestas ac elit sed dictum. Proin pulvinar, dui ut tincidunt ultricies, erat lectus feugiat tellus, at sagittis ex tortor id felis. Donec in neque vitae arcu hendrerit dignissim vel et turpis.

Nunc rhoncus, ex in maximus commodo, dui quam aliquet elit, non egestas quam tortor sit amet quam. Duis scelerisque tellus vitae sollicitudin scelerisque. Morbi enim magna, fringilla vitae pellentesque quis, semper sit amet risus. Aliquam erat volutpat. Quisque aliquam tincidunt ipsum, eu vestibulum urna porta at. Quisque et ipsum elementum, gravida metus a, elementum tellus. Cras porttitor nec tellus vitae aliquet. Aliquam at mi ut tortor ultricies maximus. Pellentesque ut enim vitae neque molestie lacinia ac eget mauris. Aliquam lacinia, dui id efficitur consequat, dolor ante fringilla massa, vitae aliquam nisi neque non ante. Mauris arcu dui, bibendum id egestas nec, vulputate nec diam. Cras nec laoreet lacus.

Integer dapibus, lorem vitae rhoncus finibus, nunc massa cursus enim, eget mollis neque est ac urna. Cras ac hendrerit lectus, sed sagittis nulla. Praesent sed interdum turpis. Ut ullamcorper ex nec venenatis fermentum. Vestibulum ut ornare libero, eu malesuada orci. Sed maximus metus ac nisl rutrum, et placerat ante bibendum.
          </ShowMoreText>
      );
  }
}
