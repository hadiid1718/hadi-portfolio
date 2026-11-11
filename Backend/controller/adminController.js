const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Predefined admin credentials from environment variables
const PREDEFINED_ADMINS = [
  {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    name: process.env.ADMIN_NAME,
    role: process.env.ADMIN_ROLE
  }
];

// Initialize / sync predefined admins
exports.initializePredefinedAdmins = async () => {
  try {
    console.log('[initializePredefinedAdmins] Starting admin initialization...');

    for (const predefinedAdmin of PREDEFINED_ADMINS) {
      // Validate environment variables
      if (
        !predefinedAdmin.email ||
        !predefinedAdmin.password ||
        !predefinedAdmin.name ||
        !predefinedAdmin.role
      ) {
        console.error(
          '[initializePredefinedAdmins] Missing admin environment variables'
        );

        console.error(
          'Required: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ADMIN_ROLE'
        );

        return;
      }

      console.log(
        `[initializePredefinedAdmins] Checking admin: ${predefinedAdmin.email}`
      );

      // Find admin by email
      let admin = await Admin.findOne({
        email: predefinedAdmin.email
      });

      // =========================================================
      // ADMIN EXISTS
      // =========================================================
      if (admin) {
        console.log(
          `[initializePredefinedAdmins] Admin already exists: ${predefinedAdmin.email}`
        );

        // Check whether the password from ENV matches
        // the password stored in MongoDB
        const isPasswordMatch = await bcrypt.compare(
          predefinedAdmin.password,
          admin.password
        );

        // Update password if it has changed
        if (!isPasswordMatch) {
          console.log(
            '[initializePredefinedAdmins] Password mismatch detected. Updating password...'
          );

          const salt = await bcrypt.genSalt(10);

          admin.password = await bcrypt.hash(
            predefinedAdmin.password,
            salt
          );

          console.log(
            '[initializePredefinedAdmins] Admin password updated successfully'
          );
        } else {
          console.log(
            '[initializePredefinedAdmins] Admin password is already correct'
          );
        }

        // Keep admin information synchronized with ENV
        admin.name = predefinedAdmin.name;
        admin.role = predefinedAdmin.role;

        admin.permissions = [
          'view_dashboard',
          'manage_users',
          'manage_content',
          'manage_admins'
        ];

        await admin.save();

        console.log(
          `[initializePredefinedAdmins] Admin synced successfully: ${predefinedAdmin.email}`
        );

        continue;
      }

      // =========================================================
      // ADMIN DOES NOT EXIST
      // =========================================================

      console.log(
        `[initializePredefinedAdmins] Admin not found. Creating: ${predefinedAdmin.email}`
      );

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(
        predefinedAdmin.password,
        salt
      );

      const newAdmin = new Admin({
        name: predefinedAdmin.name,
        email: predefinedAdmin.email,
        password: hashedPassword,
        role: predefinedAdmin.role,
        permissions: [
          'view_dashboard',
          'manage_users',
          'manage_content',
          'manage_admins'
        ]
      });

      await newAdmin.save();

      console.log(
        `✓ Predefined admin created: ${predefinedAdmin.email}`
      );
    }

    console.log(
      '[initializePredefinedAdmins] Admin initialization completed successfully'
    );

  } catch (error) {
    console.error(
      '[initializePredefinedAdmins] Error initializing predefined admins:',
      error.message
    );
  }
};


// =========================================================
// ADMIN LOGIN
// =========================================================

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('[adminLogin] Login attempt:', email);

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({
      email: email.trim()
    });

    // Admin doesn't exist
    if (!admin) {
      console.log(
        '[adminLogin] Admin not found:',
        email
      );

      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    console.log(
      '[adminLogin] Admin found:',
      admin.email
    );

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    console.log(
      '[adminLogin] Password match:',
      isMatch
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // JWT secret
    const jwtSecret =
      process.env.JWT_SECRET || 'your_jwt_secret_key';

    // Create JWT
    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
        role: admin.role
      },
      jwtSecret,
      {
        expiresIn: '7d'
      }
    );

    console.log(
      '[adminLogin] Login successful:',
      admin.email
    );

    return res.status(200).json({
      message: 'Admin login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions
      }
    });

  } catch (error) {
    console.error(
      '[adminLogin] Error:',
      error
    );

    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};


// =========================================================
// GET ADMIN DASHBOARD
// =========================================================

exports.getAdminDashboard = async (req, res) => {
  try {
    const Contact = require('../model/Contact');
    const Course = require('../model/Course');

    console.log(
      '[getAdminDashboard] req.adminId:',
      req.adminId
    );

    // Find admin by ID
    let admin = await Admin.findById(
      req.adminId
    ).select('-password');

    // Fallback: find by email
    if (!admin && req.email) {
      console.log(
        '[getAdminDashboard] Admin not found by ID, trying email'
      );

      admin = await Admin.findOne({
        email: req.email
      }).select('-password');
    }

    // Admin not found
    if (!admin) {
      console.log(
        '[getAdminDashboard] Admin not found'
      );

      return res.status(404).json({
        message: 'Admin not found'
      });
    }

    // Statistics
    const totalContacts =
      await Contact.countDocuments();

    const totalCourses =
      await Course.countDocuments();

    const newContacts =
      await Contact.countDocuments({
        status: 'new'
      });

    return res.status(200).json({
      message: 'Admin dashboard data fetched successfully',
      dashboard: {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          permissions: admin.permissions,
          createdAt: admin.createdAt
        },
        stats: {
          totalContacts,
          totalCourses,
          newContacts
        }
      }
    });

  } catch (error) {
    console.error(
      'Get dashboard error:',
      error
    );

    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};


// =========================================================
// GET ALL ADMINS
// =========================================================

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()
      .select('-password');

    return res.status(200).json({
      message: 'Admins fetched successfully',
      count: admins.length,
      admins
    });

  } catch (error) {
    console.error(
      'Get all admins error:',
      error
    );

    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};


// =========================================================
// CREATE NEW ADMIN
// =========================================================

exports.createAdmin = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    // Check existing admin
    let admin = await Admin.findOne({
      email: email.trim()
    });

    if (admin) {
      return res.status(400).json({
        message: 'Admin already exists with this email'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Create admin
    admin = new Admin({
      name,
      email: email.trim(),
      password: hashedPassword,
      role: role || 'admin',
      permissions: [
        'view_dashboard',
        'manage_users',
        'manage_content'
      ]
    });

    await admin.save();

    return res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions
      }
    });

  } catch (error) {
    console.error(
      'Create admin error:',
      error
    );

    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};