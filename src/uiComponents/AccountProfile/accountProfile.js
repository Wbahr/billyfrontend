import React from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import AccountInfoTab from './accountInfoTab'


class AccountProfile extends React.Component {
	state = {
    activeTab: '1'
  }

	toggle = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({ activeTab: tab })
		}
	}
	render() {
		return (
			<>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '1' })}
							onClick={() => { this.toggle('1') }}
						>
              General
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '2' })}
							onClick={() => { this.toggle('2') }}
						>
              Email
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<AccountInfoTab />
					</TabPane>
					<TabPane tabId="2">

					</TabPane>
          <TabPane tabId="3">

					</TabPane>
          <TabPane tabId="4">

					</TabPane>
				</TabContent>
			</>
		)
	}
}

export default AccountProfile
