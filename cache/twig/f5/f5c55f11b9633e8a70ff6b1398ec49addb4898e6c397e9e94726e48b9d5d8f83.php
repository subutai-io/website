<?php

/* partials/header.html.twig */
class __TwigTemplate_791a14829a2c97c8bf965f6cfa8b06ad32af890eef136c599d98841e937667f9 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<header>
    <div class=\"container\">
        <div class=\"logoWrap\">
            <img src=\"user/pages/images/logo-subutai-web-mono-white.png\">
        </div>
        <div class=\"menuWrap\">
            <nav id=\"socialNav\">
                <ul>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-youtube\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-linkedin-in\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-reddit-alien\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-twitter\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-telegram-plane\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-slack-hash\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-facebook-f\"></i></a>
                    </li>
                </ul>
            </nav>
            <nav id=\"mainMenu\" class=\"topNav\">

                ";
        // line 35
        echo "                <div class=\"dropdown\">
                    <button class=\"dropbtn\">Products <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"#\">Router</a>
                    <a href=\"#\">PeerOS</a>
                    <a href=\"#\">Bazaar</a>
                    <a href=\"#\">Blueprints</a>
                    <a href=\"#\">KHAN</a>
                    </div>
                </div>
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">About <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"#\">Leadership</a>
                    <a href=\"#\">Team</a>
                    </div>
                </div>
                <a href=\"#contact\">Getting Started</a>
                <a href=\"#contact\">Documentation</a>
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">Ideation <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"#\">Blog</a>
                    <a href=\"#\">Hardware Security</a>
                    <a href=\"#\">P2P Cloud</a>
                    </div>
                </div>
                <a href=\"#contact\">Documentation</a>
                <a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">&#9776;</a>


                ";
        // line 92
        echo "                    ";
        // line 110
        echo "                ";
        // line 111
        echo "            </nav>
        </div>
    </div>
</header>";
    }

    public function getTemplateName()
    {
        return "partials/header.html.twig";
    }

    public function getDebugInfo()
    {
        return array (  91 => 111,  89 => 110,  87 => 92,  54 => 35,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<header>
    <div class=\"container\">
        <div class=\"logoWrap\">
            <img src=\"user/pages/images/logo-subutai-web-mono-white.png\">
        </div>
        <div class=\"menuWrap\">
            <nav id=\"socialNav\">
                <ul>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-youtube\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-linkedin-in\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-reddit-alien\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-twitter\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-telegram-plane\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-slack-hash\"></i></a>
                    </li>
                    <li>
                        <a href=\"#\"><i class=\"fab fa-facebook-f\"></i></a>
                    </li>
                </ul>
            </nav>
            <nav id=\"mainMenu\" class=\"topNav\">

                {# <div class=\"topnav\" id=\"myTopnav\"> #}
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">Products <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"#\">Router</a>
                    <a href=\"#\">PeerOS</a>
                    <a href=\"#\">Bazaar</a>
                    <a href=\"#\">Blueprints</a>
                    <a href=\"#\">KHAN</a>
                    </div>
                </div>
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">About <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"#\">Leadership</a>
                    <a href=\"#\">Team</a>
                    </div>
                </div>
                <a href=\"#contact\">Getting Started</a>
                <a href=\"#contact\">Documentation</a>
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">Ideation <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                    <a href=\"#\">Blog</a>
                    <a href=\"#\">Hardware Security</a>
                    <a href=\"#\">P2P Cloud</a>
                    </div>
                </div>
                <a href=\"#contact\">Documentation</a>
                <a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">&#9776;</a>


                {# <ul>
                    {% macro nav_loop(page) %}
                        {% for p in page.children.visible %}
                            {% set active_page = (p.active or p.activeChild) ? 'active' : '' %}
                            {% if p.children.visible.count > 0 %}
                                <li>
                                    <a href=\"{{ p.url }}\" class=\"{{ active_page }}\">
                                        {{ p.menu }}
                                    </a>
                                    <ul>
                                        {{ _self.nav_loop(p) }}
                                    </ul>
                                </li>
                            {% else %}
                                <li>
                                    <a href=\"{{ p.url }}\" class=\"{{ active_page }}\">
                                        {{ p.menu }}
                                    </a>
                                </li>
                            {% endif %}
                        {% endfor %}
                    {% endmacro %}

                    <ul {{ tree ? 'class=\"tree\"' : '' }}>
                        {{ _self.nav_loop(pages) }}
                    </ul> #}
                    {# <li>
                        <a href=\"#\">Products</a>
                    </li>
                    <li>
                        <a href=\"#\">About</a>
                    </li>
                    <li>
                        <a href=\"#\">Getting Started</a>
                    </li>
                    <li>
                        <a href=\"#\">Documentation</a>
                    </li>
                    <li>
                        <a href=\"#\">Ideation</a>
                    </li>
                    <li>
                        <a href=\"#\">Contact</a>
                    </li> #}
                {# </ul> #}
            </nav>
        </div>
    </div>
</header>", "partials/header.html.twig", "/Users/fernandoted/Sites/subutai/website/user/themes/subutai/templates/partials/header.html.twig");
    }
}
