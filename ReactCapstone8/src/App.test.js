
import Login from "./components/Login";
import Home from "./components/Home";
import Explore from "./components/Explorenav";
import Book from "./components/Book";
import App from "./App"
import ViewDetails from "./components/ViewDetails";
import { Route } from 'react-router-dom';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Card, CardActions, CardMedia, FormControl, FormControlLabel, Grid, Input, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Register from "./components/Register";
// import MockAdapter from "axios-mock-adapter";


configure({ adapter: new Adapter() });

let pathMap = {};
describe("Testing Routing Application", () => {
  beforeAll(() => {
    const wrapper = shallow(<App />);
    pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component
        ? routeProps.component
        : routeProps.render;
      return pathMap;
    }, {});
  });

  it("TC 1 - should show Home component for /home router", () => {
    try {
      let returnValue = pathMap["/home"]();
      expect(returnValue.props.to).toBe("/home");
    } catch (err) {
      expect(pathMap["/home"]).toBe[Home];
    }
  });

  it("TC 2 - should show Login component for /login router", () => {
    expect(pathMap["/login"]).toBe[Login];
  })

  it("TC 3 - should show Register component for /register router", () => {
    expect(pathMap["/register"]).toBe[Register];
  })
  
  it("TC 4 - should show Explore for /explore router", () => {
    expect(pathMap["/explore"]).toBe[Explore];
  })

  it("TC 5 - should show Explore component for /explore/:id router", () => {
    expect(pathMap["/explore/:propertyId"]).toBe[ViewDetails];

  })

  it("TC 6 - should show Book component for /book/:id/:type router", () => {
    expect(pathMap["/book/:propertyId/:ageOfProperty"]).toBe[Book];
  })
});

describe('Testing UI for Login component', () => {
  let wrapper;
  beforeEach(() => {
      wrapper = shallow(<Login />);
    });
  it('TC 1 - Login Component should render a Material-UI Button on page load', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Button).exists());
  });

  it('TC 2 - Login Component should contain respective login input fields', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(TextField).exists());
  });
	
  it('TC 3 - Login Component should contain proper form classes', () => {
    wrapper = shallow(<Login />);
    expect(wrapper.find(FormControl));
  });
	
  it('TC 4 - Login Component should display error messages when input fields are left empty', () => {
      wrapper.find('form')
      expect(wrapper.find('.error'));
    });

});

describe('Testing UI for Register component', () => {
  let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Register />);
    });

  it('TC 1 - Register Component should render a Register Button on page load', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find(Button).exists());
  });

  it('TC 2 - Register Component should contain respective input fields', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find(TextField).exists());
  });
  it('TC 3 -Register Component should display error messages when input fields are left empty', () => {
    wrapper.find('form')
    expect(wrapper.find('.error'));
  });
  it('TC 4 - Register Component should contain proper form classes', () => {
    wrapper = shallow(<Register />);
    expect(wrapper.find(FormControl));
  });

});
describe('Testing UI for BOOK component', () => {
  let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Book/>);
    });

  it('TC 1 - Book Component should render a Book Button on page load', () => {
    const wrapper = shallow(<Book/>);
    expect(wrapper.find(Button).exists());
  });

  it('TC 2 - Book Component should contain respective input fields', () => {
    const wrapper = shallow(<Book/>);
    expect(wrapper.find(TextField).exists());
  });
  it('TC 3 -Book Component should display error messages when input fields are left empty', () => {
    wrapper.find('form')
    expect(wrapper.find('.error'));
  });
  it('TC 4 - Book Component should contain proper form classes', () => {
    wrapper = shallow(<Book/>);
    expect(wrapper.find(FormControl));
  });

});
describe('Testing UI for BOOK component', () => {
  let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Book/>);
    });

  it('TC 1 - Book Component should render a Book Button on page load', () => {
    const wrapper = shallow(<Book/>);
    expect(wrapper.find(Button).exists());
  });
  it('TC 3 -Book Component should display error messages when input fields are left empty', () => {
    wrapper.find('form')
    expect(wrapper.find('.error'));
  });
  

});

describe(" BOOK COMPONENT- buttons checking", () => {
  it("TC-4 - Book component has a button", () => {
    const wrapper = shallow(
      <Book/>
    );
    expect(wrapper.find("button"));
  });
})


it("TC-2 - submitVisit method set errorMessage property in error case", () => {
  try {
    const mock = new Adapter(axios);
    const wrapper = shallow(
      <Book match={{ params: { propertyId: "1001" } }} />
    );
    wrapper.setState({
      formdata: {
        propertyId: this.props.match.params.propertyId,
        propertyType: this.props.match.params.ageOfProperty,
        emailId: "",
        custName: "",
        phoneNo: "",
        pancard: "",
        VisitingDate: "",
        sellerId:this.props.match.params.propertyId,
      },
    });
    mock
      .onPost("http://localhost:5500/bookings", wrapper.state.formdata)
      .reply(404, "error message");
    new Promise((resolve, reject) => {
      wrapper.handleSubmit({
        preventDefault: () => {
          wrapper.setState({ it:""});
        },
      });
      resolve("error case");
    })
      .then((data) => {
        expect(wrapper.state("successMessage")).toBe("");
        expect(wrapper.state("errorMessage")).toBe("error message");
      })
      .catch((err) => {});
  } catch (err) {
    expect(err.message);
  }
});

describe("ViewDetails component - Testing render method", () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ViewDetails />);
  });

it('TC 1 - viewdetails Component should render a Register Button on page load', () => {
  const wrapper = shallow(<ViewDetails />);
  expect(wrapper.find(Button).exists());
});

it('TC 2 - viewDetails Component should contain respective input fields', () => {
  const wrapper = shallow(<ViewDetails/>);
  expect(wrapper.find(TextField).exists());
});
it('TC 3 -viewdetails Component should display error messages when input fields are left empty', () => {
  wrapper.find('form')
  expect(wrapper.find('.error'));
});
it('TC 4 - viewdetails Component should contain proper form classes', () => {
  wrapper = shallow(<ViewDetails />);
  expect(wrapper.find(FormControl));
});

});
describe('Testing UI for viewdetails component', () => {
let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ViewDetails/>);
  });
})

  